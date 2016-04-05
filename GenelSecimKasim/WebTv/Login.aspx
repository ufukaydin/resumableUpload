<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="WebTv.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>ANADOLU AJANSI - TV Giriş</title>
    <link rel="shortcut icon" href="images/aa_logoico.ico" type="image/x-icon" />
    <script src="Scripts/jquery-1.6.4.min.js"></script>
    <style>
        @import url(http://weloveiconfonts.com/api/?family=entypo);
        @import url(http://fonts.googleapis.com/css?family=Roboto);

        [class*="entypo-"]:before {
            font-family: 'entypo', sans-serif;
        }

        *,
        *:before,
        *:after {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        h2 {
            color: rgba(255,255,255,.8);
            margin-left: 12px;
            text-align: center;
        }

        body {
            background: #272125;
            font-family: 'Roboto', sans-serif;
        }

        form {
            position: relative;
            margin: 50px auto;
            width: 380px;
            height: auto;
        }

        input {
            padding: 16px;
            border-radius: 7px;
            border: 0px;
            background: rgba(255,255,255,.2);
            display: block;
            margin: 15px;
            width: 300px;
            color: white;
            font-size: 18px;
            height: 54px;
        }

            input:focus {
                outline-color: rgba(0,0,0,0);
                background: rgba(104, 93, 93, 0.20);
                color: whitesmoke;
            }

        button {
            float: right;
            height: 121px;
            width: 50px;
            border: 0px;
            background: #3C6FE7;
            border-radius: 7px;
            padding: 10px;
            color: white;
            font-size: 22px;
        }

        .inputUserIcon {
            position: absolute;
            top: 68px;
            right: 80px;
            color: white;
        }

        .inputPassIcon {
            position: absolute;
            top: 136px;
            right: 80px;
            color: white;
        }

        input::-webkit-input-placeholder {
            color: white;
        }

        input:focus::-webkit-input-placeholder {
            color: #e74c3c;
        }
    </style>
    <script>
        $(document).ready(function () {
            $(".user").focusin(function () {
                $(".inputUserIcon").css("color", "#e74c3c");
            }).focusout(function () {
                $(".inputUserIcon").css("color", "white");
            });

            $(".pass").focusin(function () {
                $(".inputPassIcon").css("color", "#e74c3c");
            }).focusout(function () {
                $(".inputPassIcon").css("color", "white");
            });
        });
    </script>
</head>
<body>
    <form runat="server">
        <h2><span class="entypo-login"></span>&nbsp;TV EKRANI GİRİŞ</h2>
        <button runat="server" class="submit" style="cursor:pointer;"><span class="entypo-right-open"></span></button>
        <span class="entypo-user inputUserIcon"></span>
        <input type="text" runat="server" class="user" id="username" placeholder="kullanıcı adı" />
        <span class="entypo-key inputPassIcon"></span>
        <input type="password" runat="server" class="pass" id="password" placeholder="şifre" />
    </form>
</body>
</html>
