import React from "react";

function Main({ test, logout }) {

  return (
    <>
      <h1>Main page</h1>
      <button onClick={test}>Test request</button>
      <button onClick={logout}>Log out</button>
    </>  
  )
}

export default Main;