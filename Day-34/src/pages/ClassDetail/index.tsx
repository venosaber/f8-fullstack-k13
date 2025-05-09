import {ClassroomLayout, FHeader} from "../../components";
import {useLocation} from "react-router-dom";

export default function ClassDetail() {
  const location = useLocation();
  const className = location.state?.className || 'Không có tên lớp';

  return (
    <>
      <FHeader className={className}/>
      <ClassroomLayout className={className}/>
    </>
  )
}