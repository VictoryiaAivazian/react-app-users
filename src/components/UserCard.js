import { Card } from 'antd'

export default function UserCard(props) {
    const user = props.user
    return (
        <Card className="user">
            <img className="user-img" src={ user.avatar }/>
            <div className="user-name"> { user.first_name } { user.last_name } </div>
            <a href={`mailto:${user.email}`}> { user.email } </a>
        </Card>
    )
}