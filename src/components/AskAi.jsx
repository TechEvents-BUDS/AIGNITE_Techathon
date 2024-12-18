import { useState } from "react";
import API_KEY from "../../GEMINI_API";
import DOMPurify from "dompurify";

function AskAi(){

    let [userInput , setUserInput] = useState("")
    let [response , setResponse] = useState("")

    const API_URL ="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

    function changeInput(event){
            setUserInput(event.target.value)
    }

    const  generateAIResponse = async ()=>{
  
        try {
            const res = await fetch(`${API_URL}?key=${API_KEY}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: "answer shortly "+ userInput,
                      },
                    ],
                  },
                ],
              }),
            });
      
            if (res.ok) {
              const data = await res.json();
              const getResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text
                setResponse(getResponse)
                setUserInput("")
            } 
            else {
              const errorData = await res.json();
              console.error("Error:", errorData);
              setResponse("Failed to fetch response. Check logs for details.");
            }
          } catch (error) {
            console.error("Request failed:", error);
            setResponse("An error occurred. Please try again.");
          }
    }

    function safeFormatResponse(response) {
      const formattedText = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/(\d+\.\s)/g, "<br>$1");
      return DOMPurify.sanitize(formattedText);
    }



    return <div className=" ai-section">
        <p>Ask About Greenhouse</p>
        <div className="ai-box">
            <input type="text" onChange={changeInput} value={userInput} placeholder="type here..."/>
            <button onClick={generateAIResponse}>Ask</button>
        </div>
        <div className="response">
        <p dangerouslySetInnerHTML={{ __html: response ? safeFormatResponse(response) : "" }}></p>

        </div>
    </div>
}

export default AskAi;