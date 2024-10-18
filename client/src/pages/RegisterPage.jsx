 

 const RegisterPage = () => {


    return <div className="form-container">
      <form>
         <input name="name" type="name" placeholder="Name" required />
         <input name="email" type="email" placeholder="Email" required />
         <input name="password" type="password" placeholder="Password" required />
         <input name="confirmPassword" type="password" placeholder="Confirm Password" required />
      </form>
  </div>
 }

 export default RegisterPage;