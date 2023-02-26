import { Link } from 'react-router-dom';

type EmployeePageProps = {}
  
function EmployeePage (props : EmployeePageProps) {
  return (
        <div >
            <p>This is the employee page.</p>
            <p>
                <Link to="/">Go to the Home Page!</Link>
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