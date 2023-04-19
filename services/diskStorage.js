import multer from "multer";

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


const storageService = (path) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, `uploads/${path}`);
    },
    filename: (_, file, cb) => {
      cb(null, makeid(10) + "_" + file.originalname);
    },
  });
  return storage;
}

export default storageService
