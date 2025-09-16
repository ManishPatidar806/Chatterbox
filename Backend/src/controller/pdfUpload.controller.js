// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "GOOGLE_API_KEY" });

// async function main() {
//     const pdfResp = await fetch('https://discovery.ucl.ac.uk/id/eprint/10089234/1/343019_3_art_0_py4t4l_convrt.pdf')
//         .then((response) => response.arrayBuffer());

//     const contents = [
//         { text: "What is the title of Document" },
//         {
//             inlineData: {
//                 mimeType: 'application/pdf',
//                 data: Buffer.from(pdfResp).toString("base64")
//             }
//         }
//     ];

//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash-001",
//         contents: contents,
//         config:{
//             maxOutputTokens:150
//         }
//     });
//     console.log(response.text);
// }

// main();