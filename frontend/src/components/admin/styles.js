const styles = {
    html: {
      boxSizing: 'border-box',
    },
    body: {
      fontFamily: 'Poppins, sans-serif',
      lineHeight: 1.6,
      color: '#1a1a1a',
      fontSize: 16,
      overflowX: 'hidden',
      backgroundImage: 'url("./wallpaper.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    a: {
      color: '#2196f3',
      textDecoration: 'none',
    },
    textCenter: {
      textAlign: 'center',
    },
    outerContent: {
      paddingTop: 100,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    signUpContainer: {
      width: '50%',
      margin: '4%',
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: '4%',
      textAlign: 'center',
      paddingBottom: 50,
    },
    outerMargin: {
      textAlign: 'center',
      height: '100%',
      display: 'inline-block',
      padding: '20px 20px 20px 10px',
      borderRadius: 20,
      borderStyle: 'solid',
      borderWidth: 3,
      borderColor: '#2196f3',
    },
    welcomeContainer: {
      width: '50%',
      backgroundColor: 'rgb(255, 255, 255)',
      textAlign: 'center',
      paddingBottom: 30,
      borderRadius: 40,
      fontFamily: 'PinyonScript-regular',
    },
    headingSignUp: {
      fontSize: 35,
      textAlign: 'center',
    },
    textGrey: {
      color: '#aaa',
    },
    label: {
      pointerEvents: 'none',
      position: 'absolute',
      bottom: 5,
      left: 20,
      color: '#00000070',
      fontWeight: 500,
      fontSize: 18,
      transition: 'all 0.2s',
      transformOrigin: 'left',
    },
    'inputText:not(:placeholder-shown) + .label': {
      bottom: 20,
      transform: 'scale(0.75)',
    },
    inputTextFocus: {
      outlineColor: '#2196f3',
    },
    fRow: {
      display: 'flex',
      gap: 25,
      overflowWrap: 'break-word',
    },
    inputText: {
      fontFamily: 'inherit',
      fontSize: 18,
      padding: '30px 0 8px 17px',
      border: 'none',
      borderRadius: 32,
      background: '#eee',
      fontWeight: 600,
      width: '100%',
    },
    fRowItem: {
      marginTop: 10,
    },
    inputTextFocus: {
      outlineColor: '#2196f3',
    },
    validateText: {
      color: '#b80808',
    },
    confirmPassword: {
      display: 'none',
    },
    signUpContainer: {
      display: 'flex',
    },
    signUpForm: {
      width: '100%',
    },
    inputSetup: {
      margin: 40,
    },
    inp: {
      position: 'relative',
    },
    submitButton: {
      backgroundColor: '#018bfc',
      width: '100%',
      height: 50,
      border: 'none',
      fontSize: 25,
      color: '#ffffff',
      fontWeight: 600,
      borderRadius: 20,
      marginTop: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    welcomeAnimation1: {
      marginTop: 30,
      position: 'relative',
      textAlign: 'center',
    },
    welcomeHeader: {
      fontSize: 70,
      fontFamily: 'PinyonScript-regular',
      fontWeight: 1000,
    },
    '@keyframes float': {
      '0%': {
        boxShadow: '0 5px 15px 0px rgba(0, 0, 0, 0.6)',
        transform: 'translateY(0px)',
      },
      '50%': {
        boxShadow: '0 25px 15px 0px rgba(0, 0, 0, 0.2)',
        transform: 'translateY(-20px)',
      },
      '100%': {
        boxShadow: '0 5px 15px 0px rgba(0, 0, 0, 0.6)',
        transform: 'translateY(0px)',
      },
    },
    containerLogo: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeLogo: {
      boxSizing: 'border-box',
      border: '5px white solid',
      backgroundColor: '#ffffff',
      backgroundImage: 'url("./logocars4u.jpg")',
      backgroundPosition: 'center',
      minWidth: 280,
      height: 90,
      borderRadius: 40,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      overflow: 'hidden',
      boxShadow: '0 5px 15px 0px rgba(0, 0, 0, 0.6)',
      transform: 'translateY(0px)',
      animation: 'float 6s ease-in infinite',
    },
    '@media (max-width: 600px)': {
      signUpContainer: {
        width: '100%',
        margin: '4%',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '4%',
        padding: '0px 10px 10px 10px',
      },
      welcomeContainer: {
        display: 'none',
      },
      headingSignUp: {
        fontSize: 30,
        textAlign: 'center',
      },
      content: {
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      },
      outerContent: {
        paddingTop: 150,
      },
    },
    '@media (max-width: 1500px)': {
      fRowItem: {
        width: '100%',
      },
      fRow: {
        display: 'flex',
        gap: 25,
        overflowWrap: 'break-word',
        textAlign: 'center',
      },
      label: {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 4,
        left: 17,
        color: '#00000070',
        fontWeight: 500,
        fontSize: 15,
        transition: 'all 0.2s',
        transformOrigin: 'left',
      },
      'inputText:not(:placeholder-shown) + .label': {
        bottom: 18,
        transform: 'scale(0.75)',
      },
      inputText: {
        fontFamily: 'inherit',
        fontSize: 15,
        padding: '25px 0 5px 14px',
        border: 'none',
        borderRadius: 28,
        background: '#eee',
        fontWeight: 600,
        width: '100%',
      },
      outerContent: {
        paddingTop: 150,
      },
    },
  };
export default styles;  