import './App.css';

function App() {
  return (
    <div class="App">
        <div class="header">
          <h1>Connect with other<br/>Make you better</h1>
          <a href="/">Sign in to your FinCon Account !</a>
        </div>
        <form action="/" method="POST">
          <div class="field">
            <input type="text" name="ipEmail" id="ipEmail" placeholder="avc@avc.com"/>
            <label for="email">Email</label>
          </div>
          <div class="field">
            <input type="password" name="ipPass" id="ipPass" placeholder="ThisIsMyPassword"/>
            <label for="password">Password</label>
          </div>
          <input type="submit" value="Sign in"/>
        </form>
        <p>Don't have an account? <a href="/">Sign up</a></p>
    </div>
  );
}

export default App;
