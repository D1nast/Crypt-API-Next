'use client';

import { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { generateClient } from '@aws-amplify/api';
import outputs from '../../amplify_outputs.json';

const client = generateClient(); // AppSync クライアントを作成

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    // ユーザー登録の GraphQL Mutation
    const registerUser = async () => {
        try {
            const mutation = `
                mutation CreateUser($input: CreateUserInput!) {
                    createUser(input: $input) {
                        id
                        email
                        createdAt
                    }
                }
            `;

            const variables = {
                input: {
                    email: email,
                    password: pass, // DynamoDB にパスワードを保存する場合
                    createdAt: new Date().toISOString(),
                }
            };

            const result = await client.graphql({
                query: mutation,
                variables: variables,
            });

            // console.log("User registered:", result.data.createUser);
            alert("User registered successfully!");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <Box sx={{border:{xs:"none",sm:0}, padding:{xs:"150px 50px 150px 50px",sm:"150px 0px 60px 0px"},
            display:"flex", flexDirection:"column", justifyContent:"center", backgroundColor:"#000000"}}>
            
            {/* サブスク登録画面 */}
            <Box sx={{ display:"flex", justifyContent:"center", paddingTop:"20px", paddingBottom:"20px" }}>
                <Box sx={{ width:"500px", display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"100%",
                    padding:{xs:"20px 0px 20px 0px",sm:"20px 0px 20px 0px"}, border:"solid #FFFFFF",
                    boxShadow:"0 3px 5px rgba(0, 0, 0, 0.22)" }}>
                    
                    <Typography sx={{ marginBottom:"20px", color:"#FFFFFF" }}>Subscription</Typography>

                    {/* メールアドレス */}
                    <Box>
                        <Input value={email} placeholder=" Mail" onChange={(e) => setEmail(e.target.value)}
                        sx={{ backgroundColor:"white", width:{xs:"250px",sm:"400px"}, height:{xs:"20px",sm:"20px"}}} />
                    </Box>

                    {/* パスワード入力 */}
                    <Box sx={{ marginTop:"50px", display:"flex", alignItems:"center", maxWidth:"400px" }}>
                        <Input value={pass} placeholder=" Pass(６文字以上)" type={passwordType} onChange={(e) => setPass(e.target.value)}
                        sx={{ backgroundColor:"white", width:{xs:"225px",sm:"400px"}, height:{xs:"20px",sm:"20px"}}} />
                        {passwordType === "password" && (
                            <VisibilityOffIcon sx={{ marginLeft:"8px", backgroundColor:"white", maxHeight:"20px" }}
                            onClick={() => setPasswordType("text")} className="Password__visual" />
                        )}
                        {passwordType === "text" && (
                            <VisibilityIcon sx={{ marginLeft:"8px", backgroundColor:"white", maxHeight:"20px" }}
                            onClick={() => setPasswordType("password")} className="Password__visual" />
                        )}
                    </Box>
                    
                    {/* ボタン */}
                    <Box style={{ marginTop: "20px" }}>
                        <button onClick={registerUser}>Subscribe</button>
                    </Box>
                </Box>
            </Box>

            {/* 各ボタン説明 */}
            <Box sx={{ marginTop:"50px", display:"flex", flexDirection:"column", alignItems:"center" }}>
                <Typography sx={{ marginBottom:"20px", color:"#FFFFFF" }}>Subscribe : Register your email address</Typography>
            </Box>
        </Box>
    );
}


