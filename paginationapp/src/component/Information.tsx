import { useSelector ,useDispatch} from 'react-redux';
export default function Information(){
     //getting redux data
     const Datas = useSelector((store:any) => store?.takeActions?.Data[0])
     
    return(
        <div><h5>Information</h5>
            <p>{JSON.stringify(Datas)}</p></div>
    )
}