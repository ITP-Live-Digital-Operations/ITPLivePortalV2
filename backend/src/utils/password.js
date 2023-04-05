const crypto = require('crypto-js');


/* const hash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); */

/* const compare = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword); */

const compare = (password, encryptedPassword, hash) => {
    const decryptedPassword = crypto.AES.decrypt(encryptedPassword, hash).toString(crypto.enc.Utf8);
    return password === decryptedPassword;

}


module.exports = {
    compare
}