import React from 'react'
import Search from './Search'

export default function Home() {

  return (
    <>
        <div className='onlargeViewport'>
            <p className='home-para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Porro architecto, mollitia omnis voluptatibus veniam neque <br /> perspiciatis possimus nesciunt  commodi tempora unde, <br /> <span className='home-para-border'>fugit quia delec</span>tus! </p>
            <h1 className='text-font home-heading'>What are you <br /> having for launch ?</h1>
            <Search />
        </div>
    </>
  )
}
