import { useDispatch, useSelector } from "react-redux";

function StatisticsAnalysis(props) {
    let dispatch = useDispatch();
    let { sellerInfo, isLoggedIn } = useSelector((state) => state.seller);

    return(
        <div>
            통계 분석 화면입니다.
            <button onClick={()=>{
                console.log(sellerInfo.email_id + isLoggedIn);
            }}>dd</button>
        </div>
    )
}

export default StatisticsAnalysis;