import React from 'react'
import { useSelector } from 'react-redux';
import { parseCamelCase } from '../../utils/textParsers';
import { Container } from './styles';

const ProfileInfo = () => {
    const {
        user: { userInfo },
      } = useSelector((state) => state);
  return (
    <Container>
      {Object.entries(userInfo).map((userOption) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4>{parseCamelCase(userOption[0])}:</h4>
          <p>
            {userOption[1] ? (
              <label style={{ marginLeft: "3px" }}>{userOption[1]}</label>
            ) : (
              <label
                style={{ color: "rgba(140,140,140,0.8)", marginLeft: "3px" }}
              >{`<empty>`}</label>
            )}
          </p>
        </div>
      ))}
      <hr style={{marginTop:'15px'}}/>
    </Container>
  )
}

export default ProfileInfo
