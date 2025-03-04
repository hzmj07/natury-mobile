import { showMessage, hideMessage } from "react-native-flash-message";

export const globelError = (e) => {
    const errorCode = e.response?.status || null;
  
  
    const errorMessages = {
      400 : "Kullanıcı Bulunamadı Hata oluştu!",
      401: "Email veya şifre yanlış lütfen tekrar deneyiniz.", 
      402 : "Kullanıcı adı veya email zaten kullanılıyor", 
      403: "Erişim reddedildi. Bu işlem için yetkiniz yok.",
      404: "Kaynak bulunamadı. Lütfen URL'yi kontrol edin.",
      500: "Sunucu hatası. Lütfen daha sonra tekrar deneyin.",
    };
  
    const errorMessage =
      errorMessages[errorCode] || "Please check your internet connection.";
      console.log( "error mesaje" ,  errorMessage);

      
    showMessage({
      message: `${errorMessage}`,
      type: "danger",
      hideStatusBar : true,
      icon:"auto"
    });
    return errorMessage;
  };
  