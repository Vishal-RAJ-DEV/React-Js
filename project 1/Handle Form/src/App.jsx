import { useState } from 'react'
import './App.css'
import { useForm } from "react-hook-form"



function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(d)
      }, d * 1000)
    })
  }
  const onSubmit = async (data) => {
    await delay(4)
    console.log(data)
  }



  return (
    <>
      {isSubmitting && <div>...loading</div>}
      <div className=' container'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='username' {...register("username",
            {
              required: { value: true, message: "This field is required" },
              minLength: { value: 3, message: "Min length is 3" },
              maxLength: { value: 8, message: "max length is 8 " }
            })}
            type="text" />
          {errors.username && <div className='red'>{errors.username.message}</div>}
          <br />
          <input
            placeholder='password'
            {...register("password", {
              required: { value: true, message: "This field is required" },
              minLength: { value: 7, message: "Min length of password is 7" }
            })}
            type="password"
          />
          {errors.password && <div className='red'>{errors.password.message}</div>}
          <br />
          <input disabled={isSubmitting} type="submit" />
        </form>
      </div>
    </>
  )
}

export default App
