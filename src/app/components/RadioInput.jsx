import { FormGroup,Input,Label } from "reactstrap";

const RadioInput = ({tag,value,onChange}) => {
    return ( 
        <div className="">
            <FormGroup check inline>
                <Input
                name={tag}
                type="radio"
                value={`${value}`}
                onChange={onChange}
                />
                <Label check>
                {value}
                </Label>
            </FormGroup>
        </div>
            
     );
}
 
export default RadioInput;