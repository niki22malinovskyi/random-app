import { useState } from 'react';
import { ChangeEvent } from "react";

type EditableSpanType = {
    name: string
    onChange: (newValue: string) => void
}

export function EditName(props: EditableSpanType) {
    
    let [editMode, setEditMode] = useState(false);
    let [newName, setNewName] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setNewName(props.name);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(newName);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewName(e.currentTarget.value)
    return editMode
        ? <input value={newName} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.name}</span>
} 