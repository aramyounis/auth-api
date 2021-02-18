#onetwo_api
(
لە کاتی لۆگین بوونا لە کۆمپیتەرێکا لە داتابەیس لۆگین بوونەکەی هەڵەگیرێت کاتێک ویستی لە شوێنێکی ترەوە لۆگهین بکات بۆی نەتوانێت
ئەگەر ویستی لە شوێنێکی تر داخڵبێت پێویستە خۆی لۆگاوت بکات یان ەمەیڵێکی بۆ ئەنێرین بۆ لۆگئاوت کردنەی ئەکاوتتەکەی لای خۆمانەوە)

#drust krdni migrate knex
#knex migrate:make migration_name

#run krdni migrate knex
#knex migrate:latest

#srinaway data w table migrateka
#knex migrate:rollback

#Routers راوتەکان

#Authentication
1- auth/login POST Body(email , password)
#Midleware Used
1-reqDataLogin (بۆ دڵنیابوونەوە لە داتای نێردراو )
2-login_Controller

2- auth/register POST Body(email ,username, password)
1-reqDataRegister (بۆ دڵنیابوونەوە لە داتای نێردراو )
2-register_Controller

3- auth/getInformation POST Header( Authentication AccessToken)
1-verifyAccessToken (بۆ دڵنیابوونەوە لە ڕاستی تۆکینەکە)
2-getInformation_Controller

#Reset Passowrd
4- auth/emailforgetPassowrd POST Body(email)
1-reqDataSendEmail (بۆ دڵنیابوونەوە لە داتای نێردراو )
2-sendEmailForgetPass (ناردنی ئیمەیڵ بۆ گێرانەوەی پاسۆرد)

5- get/forgetPassowrd GET Params(forgetPassToken)
1-verifyForgetPassTokenParams (بۆ دڵنیابوونەوە لە داتای نێردراو )
2-forgetPassowrdPage (ناردنەوەی پەیگی پاسۆرد لە کاتی کلیک کردن لە فۆرگێت پاسۆرد لە ئیمەیڵ)

6- auth/resetPassowrd POST Body(password, newPassword) Header(Authentication forgetPassToken)
1-reqDataForgetPassowrd (بۆ دڵنیابوونەوە لە داتای نێردراو )
2-verifyForgetPassToken (بۆ دڵنیابوونەوە لە ڕاستی تۆکینەکە)
3-changePassowrdAction (لەدوای ذڵنیابوونەوە لە داتا و تۆکین پاسۆردەکە ئەگۆڕێت)

#email verification
7- auth/emailVerify POST Header( Authentication AccessToken)

8- get/verify GET Params(verifyEmailToken)

#Refreshing Token
9- auth/refresh_token POST Header( Authentication RefreshToken)

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#Middlewares میدڵوێرەکان

1- Error (بۆ گەڕاندنەوەی یەرۆر بە شێوەیەک کە هیچ زانیاریەکی ناو سێرڤەر نەگەڕێتەوە بۆ یوزەر)

2- ValidateDataReq (بۆ ذڵنیابوونەوە لەو زانیاریانەی کە یوزەر ئەینێرێت وەک ئیمەیڵ و پاسسۆرد لە کاتی لۆگین یان هەر ڕاوتێکی تر)

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#Models
بۆ جێبەجێکردنی کویریەکانی داتابەیس

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#Helpers یارمەتیدەرەکان
1- JWT (ئەنێرێتەوە لەگەڵ ریکوێستێک JWT و چێک کردنی لە کاتی یوزەر JWT بۆ درووستکردی )

2- SendEmail (بۆ ناردنی ئیمەیڵ)

3- generateHTMLFiles (کە ڵەگەڵ ئەو تۆکنەی دروست ئەکڕێت بۆ گەڕانەوەی پاسۆرد یان دڵنیابونەوە لە ئیمەیڵ بە ئیمەیڵ ئەنێردرێت HTML بۆ دروستکردنی فایلی )
