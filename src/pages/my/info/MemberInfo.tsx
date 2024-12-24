import {useParams} from "react-router";
import MemberInfoComponent from '@components/my/info/MemberInfoCompoment.tsx';

function MemberInfo() {

    const {tno} = useParams()

    return (
            <MemberInfoComponent tno={tno}/>
    );
}

export default MemberInfo;