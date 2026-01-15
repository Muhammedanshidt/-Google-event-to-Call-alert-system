import axios from "axios";
import User from "../../models/users";
import {generateRefreshToken,generateAccessToken} from "../../../utils/jwt";
import {CustomError} from "../../../utils/CustomError";

interface IGoogleAuth {
    googleId: string;
    username: string;
    name: string;
    photo_url: string;
  }



  const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,

  } = process.env;


  export const initiateAuth = async () => {
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&response_type=code` +
      `&access_type=offline` +
      `&prompt=consent` +
      `&scope=${encodeURIComponent(
        "openid email profile https://www.googleapis.com/auth/calendar.readonly"
      )}`;


      // const url = `https://accounts.google.com/o/oauth2/v2/auth`+
      // `?client_id=${CLIENT_ID}`+
      // `&redirect_uri=${REDIRECT_URI}`+
      // `&response_type=code`+
      // `&access_type=offline`+
      // `&prompt=consent`+
      // `&scope=openid email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile`
      // ;
      


  
    return {
      message: "success",
      data: url,
    };
  };
  


  export const callbackUrl = async (code: string) => {
    try {
  
      const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      });
  
      const { access_token, refresh_token } = tokenRes.data;

      const profileRes = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
  
      const { name, email, verified_email, picture, id } = profileRes.data;
  
      if (!verified_email) throw new CustomError("Email not verified", 400);
 
      
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          email,
          name,
          avatar: picture,
          googleId: id,
          is_active: true,
          accessToken: access_token,
          refreshToken: refresh_token
        });
      } else {
        user.accessToken = access_token;
  
        if (refresh_token) {
          user.refreshToken = refresh_token;
        }
  
        user.name = name;
        user.avatar = picture;
  
        await user.save();
      }
  
      const payload = {
        id: user._id,
        email: user.email!,
        is_active: user.is_active ?? true,
      };
  
      const refreshJwt = await generateRefreshToken(payload);
      const accessJwt = await generateAccessToken(payload);

  
      const needsPhone = !user.phoneNumber;
      const redirectUrl = needsPhone
        ? "http://localhost:3000/phone"
        : "http://localhost:3000/dashboard";
  
      return {
        statusCode: 302,
        message: "success",
        cookies: [
          {
            name: "accessToken",
            value: accessJwt,
            options: { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: "lax" },
          },
          {
            name: "refreshToken",
            value: refreshJwt,
            options: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" },
          },
        ],
        redirect: redirectUrl,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 302,
        message: "failed",
        redirect: "http://localhost:3000/login",
      };
    }
  };
  

  export const getMe = async (userId: string) => {
    try {
      const user = await User.findById(userId).select("-accessToken -refreshToken");
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      return {
        statusCode: 200,
        message: "success",
        data: user,
      };
    } catch (error: any) {
      throw new CustomError(error.message || "Failed to fetch user", 500);
    }
  };

  export const updatePhoneNumber = async (userId: string, phoneNumber: string) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new CustomError("User not found", 404);
      }

      // Basic phone validation
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
        throw new CustomError("Invalid phone number format", 400);
      }

      user.phoneNumber = phoneNumber.replace(/\s/g, '');
      await user.save();

      return {
        statusCode: 200,
        message: "Phone number updated successfully",
        data: user,
      };
    } catch (error: any) {
      throw new CustomError(error.message || "Failed to update phone number", 500);
    }
  };
