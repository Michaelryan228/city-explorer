import React from 'react';
import Table from 'react-bootstrap/Table';


class Weather extends React.Component {
    render() {
        return(
            <>
                      {this.props.error ?
            <div>
              <h2>{this.props.error} : {this.props.error}</h2>
            </div> :
                            <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Forecast</th>
                                </tr>
                            </thead>
                            <tbody>
                              {this.props.weatherData.map((day, index) => (
                                  <tr key={index}>
                                  <td>{day.date}</td>
                                  <td>{day.description}</td>
                                  </tr>
                              ))}
                            </tbody>
                        </Table>
        
            }

            </>
        );
    }
}

export default Weather;