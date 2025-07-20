export const TOOLBAR_CONFIG = {
  display: [
    'BLOCK_TYPE_DROPDOWN',
    'INLINE_STYLE_BUTTONS',
    'BLOCK_TYPE_BUTTONS',
    'CUSTOM_BUTTONS'
  ],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' }
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Paragraph', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: '', style: 'code-block', className: 'code-button' }
  ]
};

export const AUTH_CONSTANTS = {
  signInAlert: "You must be signed in to interact.",
  signInLabel: "Sign In",
  signUpLabel: "Sign Up",
  signInButtonLabel: "Sign In",
  signOutButtonLabel: "Log Out",
  signInToContinueLable: "Sign in to continue",
  SignInToAccessAllFeaturesAppLable: "Sign in to access all the features on this app",
  DoNotHaveAccountLable: "Do not have an account?"
}

export const APP_TITLE = "foo-rum";