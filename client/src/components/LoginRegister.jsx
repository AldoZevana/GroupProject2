import React, { useState } from 'react';
import * as Components from '../components/components'; // Ensure correct path

const LoginRegister = () => {
  const [signIn, toggle] = useState(true);

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        {/* Your SignUp Form */}
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        {/* Your SignIn Form */}
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          {/* Your Overlay Panels */}
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default LoginRegister;
