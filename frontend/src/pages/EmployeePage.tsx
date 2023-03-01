import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

type EmployeePageProps = {}
  
function EmployeePage (props : EmployeePageProps) {
  return (
        <div >
            <p>
            <Link to="/employee"> <Button >Employee Page</Button></Link>
            <Link to="/customer"> <Button >Customer Page</Button></Link>
            <Link to="/signup"> <Button >Sign Up</Button></Link>
            </p>
            <div style={{display: 'flex', justifyContent: 'center', padding: 30}}>
              <table>
                <tr>
                  <th>In Progress</th>
                </tr>
                <tr>
                  <td><Link to="/order">Order 1201</Link></td>
                </tr>
                <tr>
                  <td>Order 1202</td>
                </tr>
                <tr>
                  <td>Order 1203</td>
                </tr>
              </table>
            </div>
        </div>
    );
};

export default EmployeePage;