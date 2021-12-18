

## Setup Project

to install packages

```bash
  yarn add
  npm install
```

install knex globally

```bash
  npm install -g knex 
```





## API Reference

#### Register User

```http
  POST /api//register
```

| Parameter  | Type     | Description                                        |
| :--------- | :------- | :------------------------------------------------- |
| `email`    | `string` | **Required**. Your Email , Must be a valid email   |
| `username` | `string` | **Required**. Your Username ,Length grater than 4  |
| `password` | `string` | **Required**. Your password , Length grater than 4 |

#### Server Response

- ئەگەر هەر هەڵەیەک هەبێت لەو زانیاریانەی نیردراوە ئەوا سیرڤەر ئیرۆر ئەنێریتەوە لەگەڵ نامەیەکی ئیرۆرەکە بە کۆدی ٤٢٢ کە بە واتای ئەوە دێت زانیاریەکە هەڵەی تیایە بۆ نمونە ئەگەر ئیمیڵێک بە شێوازەێکی هەڵە بنوسیت جوابدانەوەی سێرڤەر بەم شیوە دەبێت
  ```javascript
  return {
    status: false,
    error_code: 422,
    error_message: '"email" must be a valid email',
  };
  ```
- ئەگەر هیچ هەڵەیەک لە زانیاریەکانت نەبوو ئەوا سیرڤەر نامەیەک ئەنێریتەوە کە بە سەرکەووتوی تۆمار کراوە هەروەها ڕاستەوخۆ ئیمێڵێ دڵنیاکردنەوە ئەنێردرێت بۆ ئەو ئیمەیڵە کە خۆت پێی تۆمارکردوە لە ئیمەیڵەکەتەوە پێویستە دڵنیا بکەیتەوە بۆ ئەوەی هەژمارەکە چالاک بکرێت

```javascript
return {
  status: true,
  message: "Successfuly Registered Check Your Email To Verify Your Account",
};
```

#### Login User

```http
  POST /api//login
```

| Parameter  | Type     | Description                                        |
| :--------- | :------- | :------------------------------------------------- |
| `email`    | `string` | **Required**. Your Email , Must be a valid email   |
| `password` | `string` | **Required**. Your password , Length grater than 4 |

#### Server Response

- ئەگەر هەر هەڵەیەک هەبێت لەو زانیاریانەی نیردراوە ئەوا سیرڤەر ئیرۆر ئەنێریتەوە لەگەڵ نامەیەکی ئیرۆرەکە بە کۆدی ٤٢٢ کە بە واتای ئەوە دێت زانیاریەکە هەڵەی تیایە بۆ نمونە ئەگەر ئیمیڵێک بە شێوازەێکی هەڵە بنوسیت جوابدانەوەی سێرڤەر بەم شیوە دەبێت

  ```javascript
  return {
    status: false,
    error_code: 422,
    error_message: '"email" must be a valid email',
  };
  ```

- ئەگەر تێپەڕە وشە یەخود ئیمەیڵەکەت هەڵەبێت ئەوا جوابدانەوەی سێرڤەر بەم جۆرە ئەبێت

  ```javascript
  return {
    status: false,
    error_code: 400,
    error_message: "Email or Password Invalid!",
  };
  ```

- درووست ئەکرێت ئەنیردرێنەوە ( token )ئەگەر زانیاریەکان ڕاستبن ئەوا لە سێرڤەر دوو
- کان بەکاریەت بۆ ناسینەوەی بەکارهێنەر(token) لەکاتی ناردنی ناردنی داواکاری تردا

```javascript
return {
  status: true,
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ2ODQ0NDgsImV4cCI6MTYyNDY4NDYyOCwiYXVkIjoiNGE5MmRhZWMtY2JlZi00MjczLThlYmQtY2EyMzJhMDYxYzljIiwiaXNzIjoib25ldHdvLmNvbSJ9.2ArJcg_3qSM-UPea7cl-_Ql8Jc6KRnyh7_mbU8wkWo0",
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ2ODQ0NDgsImV4cCI6MTYyNTI4OTI0OCwiYXVkIjoiNGE5MmRhZWMtY2JlZi00MjczLThlYmQtY2EyMzJhMDYxYzljIiwiaXNzIjoib25ldHdvLmNvbSJ9.Ifmie3pnC1xKeBx_eYqQHvqjgf3orzGB1H_peMgOevo",
};
```


### (accessToken , refreshToken) بەکارهێنانی 
- بۆ زیاتر پاریزراوی سیستەمەکەمان دوو ناسنامە درووست ئەکەین بۆ بەکەرهێنەر کە یەکێکیان بەکارهێنەر لەڕێگەیەوە داواکاریەکانی پێ ئەنەێرێت ئەویتریان بۆ تازاکردنەوەی ناسنامە سەرەکیەکەیە چونکە پێویستە ئەو ناسنامەیە تەنها بۆ ماوەی چەند خولەکێکی کەم کار بکات کە لەگەڵ داواکاریاکان ئەنیردرێت هەرکاتێک کاتەکەی تاواو بوو لە ڕێگەی ناسنامەی دوومەوە بە ناردنی داواکاریەک بۆ سێرڤەر ناسنامەیەکی تازامەن بۆ بنێرێتەوە ناسنامەی دوەمیشمان بۆ ماوەی هەفتە یاخود مانگێک کاربکات باشترە

- ئەشتوانرێت تەنها ناسنامە سەرەکیەکە بەکەربهێنرێت بەڵام ئەوکاتە پێویستە ماوەی بەسەرچونی زیاد بکرێت بۆ ئەوەی بەکارهێنەر لە دوای چەند خولەکێک نەکرێتە دەرەوە بەڵام ئەم ڕێگایەیان تا ڕادەیاک بۆ لایەنی پارێزراوی باش نیە

- داڕشتنەوەی ئەمە پێویستە لە کاتی دروستکردنی ڕوکارا ڕەچاو بکرێت لە ڕوکارەکەیا ناسنامەکان نوێ بکرێنەوە بە شێوەیەک کە بەکەرهێنەر توشی چونەدەرەوەی ئۆتۆماتیکی نەبێت بەهۆی ناسنامەکەوە


#### add(num1, num2)

Takes two numbers and returns the sum.
