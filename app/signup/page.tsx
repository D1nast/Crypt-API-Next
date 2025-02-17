'use client';

import { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import outputs from '../../amplify_outputs.json';
import { createUser, updateUser, deleteUser } from '../../src/graphql/mutations';
import * as APITypes from "../../src/API";
Amplify.configure(outputs);
const client = generateClient();

export default function SignUp(){
    const [email,setEmail] = useState("");
    const create = async ( email:string,deliver:boolean )=>{
        // データ構造を作る（APITypesのCreateUserInputに準じた型で）
        const userInput: APITypes.CreateUserInput = {
            id : crypto.randomUUID(),
            email,
            deliver
        };
        // 分割代入で正常処理の場合とエラーの場合を格納
        // query: APIで定義されている通信方式の指定　variables: APIで定義されているデータ型を引数として渡す
        const { data,errors } = await client.graphql({
            query: createUser ,
            variables: {input:userInput}
        });
        if (errors){
            console.error( "Error creating user:",errors );
            return null;
        }
        console.log("User created:",data.createUser);
        return data.createUser;
    };
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // フォーム送信を防ぐ（不要なら省略可能）
        create(email, true); // create関数を呼び出す
      };
    
    // //メール配信の登録と解除
    // const changeDeliver = async () => {
    //     const url = `${process.env.REACT_APP_API}/change`;
    //     const reqBody = { user: { email, password: pass, password_confirmation: pass } };
    //     try{
    //         const query = await axios.post(url,reqBody);
    //         alert(query.data)}
    //     catch{ alert("Either the user is not registered, or the email address or password is incorrect.")}
    // };
    // //ユーザー削除
    // const Delete = async () => {
    //     const url = `${process.env.REACT_APP_API}/delete`;
    //     const reqBody = { user: { email, password: pass, password_confirmation: pass } };
    //     try{
    //         await axios.post(url,reqBody);
    //         alert("executed!")
    //     }catch{
    //         alert("Either the user is not registered, or the email address or password is incorrect.")
    //     }
    // };

    return(
        <Box sx={{border:{xs:"none",sm:0},padding:{xs:"150px 50px 150px 50px",sm:"150px 0px 60px 0px"},display:"flex",flexDirection:"column",justifyContent:"center",backgroundColor:"#000000"}}>
            {/* サブスク登録画面 */}
            <Box sx={{display:"flex",justifyContent:"center",paddingTop:"20px",paddingBottom:"20px"}}>
                <Box sx={{width:"500px",display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"100%",
                    padding:{xs:"20px 0px 20px 0px",sm:"20px 0px 20px 0px"},border:"solid #FFFFFF",boxShadow:"0 3px 5px rgba(0, 0, 0, 0.22)"}}>
                    <Typography sx={{marginBottom:"20px",color:"#FFFFFF"}}>Subscription</Typography>
                {/* メールアドレス */}
                <Box>
                    {/* <input value={email} placeholder="Mail" onChange={(e) => setEmail(e.target.value)} sx={{ width: "400px" }}/> */}
                    <Input value={email} placeholder=" Mail" onChange={(e) => setEmail(e.target.value)} 
                    sx ={{backgroundColor:"white",width:{xs:"250px",sm:"400px"},height:{xs:"20px",sm:"20px"}}} />
                </Box>
                {/* ボタン */}
                <Box style={{ marginTop: "20px" }}>
                    <button onClick={handleSubmit}>Subscribe</button>
                    {/* <button onClick={changeDeliver}>Stop / Resume</button>
                    <button onClick={Delete}>Delete</button> */}
                </Box>
                </Box>
            </Box>
            {/* 各ボタン説明 */}
            <Box sx={{marginTop:"50px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Typography sx={{marginBottom:"20px",color:"#FFFFFF"}}>Subscribe : Register your email address</Typography>
                <Typography sx={{marginBottom:"20px",color:"#FFFFFF"}}>Stop / resume : Stop delivering email. If you&apos;ve already stopped,resume delivering.</Typography>
                <Typography sx={{marginBottom:"20px",color:"#FFFFFF"}}>Delete : Delete your email address</Typography>
            </Box>
        </Box> 
                
    );
}

