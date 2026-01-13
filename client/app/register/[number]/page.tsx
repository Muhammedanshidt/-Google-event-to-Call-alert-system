import React from 'react'

async function Page({ params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;
  return (
    <div>this is register age with number {number}</div>
  )
}

export default Page