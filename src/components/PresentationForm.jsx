import React, {useState} from 'react'

import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    
  }));

function PresentationForm(props) {
    const classes = useStyles();
    const [newPresentation, setNewPresentation] = useState({
        id:'http://example.edu/credentials/2803',
        context:'https://www.w3.org/2018/credentials/examples/v1',
        type: '',
        holder: '',
        credential:''
    });

    const handleChange = (prop) => (event) => {
        setNewPresentation({ ...newPresentation, [prop]: event.target.value });
    };

    const addNewPresentation = () => {
        props.onAddPresentation(newPresentation)
    }

    return(
        <>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-presentation-id">ID</InputLabel>
                <FilledInput
                    required
                    id="new-presentation-id"
                    value={newPresentation.id}
                    onChange={handleChange('id')}
                />
            </FormControl>

            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-presentation-context">Context</InputLabel>
                <FilledInput
                    id="new-presentation-context"
                    value={newPresentation.context}
                    onChange={handleChange('context')}
                />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-presentation-type">Type</InputLabel>
                <FilledInput
                    id="new-presentation-type"
                    value={newPresentation.type}
                    onChange={handleChange('type')}
                />
            </FormControl>

            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-presentation-holder">Holder</InputLabel>
                <Select
                    labelId="new-presentation-holder"
                    id="new-presentation-holder"
                    value={newPresentation.holder}
                    onChange={handleChange('holder')}
                >
                    {
                        props.holders.map((holder, index) => (
                            <MenuItem key={holder.did} value={holder}>{`holder${index+1}`}</MenuItem>
                        ))
                    }
                    
                    </Select>
            </FormControl>

            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-presentation-credential">credential</InputLabel>
                <Select
                    labelId="new-presentation-credential"
                    id="new-presentation-credential"
                    value={newPresentation.credential}
                    onChange={handleChange('credential')}
                >
                    {
                        props.credentials.length > 0 ? props.credentials.map((holder, index) => (
                            <MenuItem key={holder.did} value={holder}>{`holder${index+1}`}</MenuItem>
                        )) : <span>NO ITEM FOUND</span>
                    }
                    
                    </Select>
            </FormControl>

            <Button disabled={props.credentials.length< 1} variant="outlined" color="primary" onClick={addNewPresentation} >New Presentation</Button>

        </>
    )
}

export default PresentationForm