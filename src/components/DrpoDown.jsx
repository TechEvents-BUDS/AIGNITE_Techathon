

function DropDown({list, onChangeHandler}){

    return <>
        <select name="" onChange={onChangeHandler}>
            {list.map( (item,index) => < option value={item} key={index} >{item}</option>  )}
        </select>
    </>
}

export default DropDown;