import { memo } from "react"
import { EditName } from "./EditName"
import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import CopyrightIcon from '@mui/icons-material/Copyright';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export type playerType = {
    id: string
    name: string
    captain: boolean
}

type PropsType = {
    id: string
    name: string
    captain: boolean
    player: boolean
    subplayer: boolean
    onChangeName: (newValue: string, id: string) => void
}

export const PlayerItem = memo((props: PropsType) => {
    const onChangeName = (newValue: string) => { props.onChangeName(newValue, props.id) }
    const dispatch = useDispatch();
    const deleteName = () => dispatch({ type: 'removePlayer', id: props.id });

    return (
        <li key={props.id} className="list">
            <EditName
                name={props.name}
                onChange={onChangeName}
            />
            <div className="wrap__icon">
                {props.captain ? <CopyrightIcon className="icon" /> : false}
                {props.player ? <PersonIcon className="icon" /> : false}
                {props.subplayer ? <PersonAddIcon className="icon" /> : false}
                <IconButton onClick={deleteName}>
                    <Delete />
                </IconButton>
            </div>
        </li>
    )
})