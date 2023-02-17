import { Link } from 'react-router-dom';

type CustomerPageProps = {}
  
function CustomerPage (props : CustomerPageProps) {
    return (
        <div >
            <p>This is the customer view.</p>
            <p>
                <Link to="/">Go to the Home Page!</Link>
            </p>
            <div style={{display: 'flex', justifyContent: 'center', padding: 30}}>
              <table>
                <tr>
                  <th>Past Orders</th>
                </tr>
                <tr>
                </tr>
                <tr>
                  <td>Order 1202</td>
                </tr>
                <tr>
                  <td>Order 1203</td>
                </tr>
              </table>

            

            </div>
            <table>
                <tr>
                  <th>Popular Donuts</th>
                </tr>
                <tr>
                </tr>
                <tr>
                <td><Link to="/donut">Glazed Donut</Link></td>
                </tr>
                <tr>
                  <td>Rainbow Sprinkles</td>
                </tr>
                <tr>
                  <td>Apple Krumb</td>
                </tr>
                <tr>
                  <td>Bavarian Kreme</td>
                </tr>
                <tr>
                  <td>Blueberry</td>
                </tr>
                <tr>
                  <td>Boston Kreme</td>
                </tr>
              </table>
        </div>
    );
};

export default CustomerPage;