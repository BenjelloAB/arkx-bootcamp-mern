# Problems :

->no csrf verification so we can't verify if the request was sent
form the provided form or from elsewhere

->no validation or sanitization of the request body values which
can risk XSS and SQL injection vulnerabilities 

->password is so weak and not validated