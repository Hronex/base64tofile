# Base64 To File

[![npm version][npm-image]][npm-url]
[![license][license-image]][license-url]
[![downloads][downloads-image]][downloads-url]

#### Description

Extension converts Base64 string to file on local system.

#### Installation
```npm
npm install dvs-base64tofile --save
```

#### Usage

```js
import Base64ToFile from "dvs-base64tofile";

const base64image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAP0AAAD9AEnGM3WAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAO1QTFRF////5+fb5+fn7Ozf4efbfcWygMWzfMaxdcGsgM+63t7U4d7U4t/V6eng5eXb4+LY2tjMFKCFF6GGGqKIG6KIHKOJJrmaKbqbKqmQLKqRLaqSLrudMKqRMbyePr+jQLKcSrahTrejT8OpULilVLqmVbqnWLyoWMWsWcasXMatYb+tY8CuZcGvbcSzccu1csa2eMm5e864gcy9g82+h8/Bic/CldTCldTImtbEtNzNt93OyeHU2OXa2dfK2uXb4efd4uHW5OTa5ejf5+fd6Ong6ejb6eng6ufV6ujX7OO17eCm792Q796W8Np+89VbK1r+jAAAABF0Uk5TABUVKCo1RkhKSmRlaPL19v6aYPprAAAAmklEQVQYV03L1xKCMBRF0Sii2LmAsQv23nvHhp3//xxjEjPut7NmDkKeqMOKRRBN4ts5qGEBVwpbNcTh6T4InGw77mXwdl/8JjG43S9k7GYCaPsSHp5/sKmvjk2Mcc/HYF3A2Qb+FqSwzNMhYJEUm4I/91eAgAIAVWtUafU1AIVDpzYeTK2MAHNebsOkW2QgG6Cn9ARoaQBDRh/LXCF9XihNsQAAAABJRU5ErkJggg==";

new Base64ToFile(base64image, "image/png").save();
```

[npm-image]: https://img.shields.io/npm/v/dvs-base64tofile.svg?style=flat-square
[npm-url]: https://npmjs.org/package/dvs-base64tofile
[license-image]: https://img.shields.io/npm/l/dvs-base64tofile.svg?style=flat-square
[license-url]: https://npmjs.org/package/dvs-base64tofile
[downloads-image]: http://img.shields.io/npm/dm/dvs-base64tofile.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/dvs-base64tofile
