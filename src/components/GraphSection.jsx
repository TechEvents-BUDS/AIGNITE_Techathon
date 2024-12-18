import { useState,useEffect } from "react";
import DropDown from "./DrpoDown";



function GraphSection(){

   let lst = ['Okara Urban Area in Lahore Division','Gujranwala Urban Area in Gujranwala Division', 'Rawalpindi [Islamabad] Urban Area in Rawalpindi Division', 
       'Sialkot Urban Area in Gujranwala Division','Hyderabad Urban Area in Hyderabad Division','Sargodha Urban Area in Sargodha Division',
       'Rahimyar Khan Urban Area in Bahawalpur Division','Quetta Urban Area in Quetta Division',
       'Dera Ghazi Khan Urban Area in Dera Ghazi Khan Division','Swabi Urban Area in Mardan Division','Bhawal Urban Area in Sargodha Division',
       'Palandri Urban Area in Azad Kashmir Division', 'Haripur Urban Area in Hazara Division','Daharki Urban Area in Sukkur Division','Chitral Urban Area in Malakand Division','Peshawar Urban Area in F.A.T.A. Division']

    let gasesNames = ["CH4" , "CO2" , "N2O"]


    let [divName , setDivName] = useState("Okara Urban Area in Lahore Division")
    let [gasName , setGasName] = useState("CH4")
    let [imageName , setImageName] = useState( `${divName.split(" ")[0]}_${gasName}`)



    useEffect(() => {
        setImageName(`${divName.split(" ")[0]}_${gasName}`);
      }, [divName, gasName]);

    function changeDivision(event){
        setDivName(event.target.value)

    }

    function changeGasName(event){
        setGasName(event.target.value)


    }

    return <div className="section graph-section">
            <div className="navigate-graph">
                <DropDown list={lst} onChangeHandler={changeDivision}  />
                <DropDown list={gasesNames} onChangeHandler={changeGasName} />
            </div>

            <div className="graph-image">
            <img src={`./assets/${imageName}.png`} />
            </div>
    </div>
}

export default GraphSection;
