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

function CredentialForm(props) {
    const classes = useStyles();
    const [newCredential, setNewCredential] = useState({
        id:'http://example.edu/credentials/2803',
        context:'https://www.w3.org/2018/credentials/examples/v1',
        type:'',
        subject: '',
        status: ''
    });

    const handleChange = (prop) => (event) => {
    setNewCredential({ ...newCredential, [prop]: event.target.value });
  };

    const addNewCredential = () => {
        props.onAddCredential(newCredential)
    }

    return(
        <>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-credential-id">ID</InputLabel>
                <FilledInput
                    required
                    id="new-credential-id"
                    value={newCredential.id}
                    onChange={handleChange('id')}
                />
            </FormControl>
            

            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-credential-context">Context</InputLabel>
                <FilledInput
                    id="new-credential-context"
                    value={newCredential.context}
                    onChange={handleChange('context')}
                />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-credential-subject">Subject</InputLabel>
                <Select
                    labelId="new-credential-subject"
                    id="new-credential-subject"
                    value={newCredential.subject}
                    onChange={handleChange('subject')}
                >
                    {
                        props.holders.map(holder => (
                            <MenuItem key={holder.did} value={holder.did}>Ten</MenuItem>
                        ))
                    }
                    
                    
                    </Select>
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-credential-status">Status</InputLabel>
                <FilledInput
                    id="new-credential-status"
                    value={newCredential.status}
                    onChange={handleChange('status')}
                />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="filled">
                <InputLabel htmlFor="new-credential-type">Type</InputLabel>
                <FilledInput
                    id="new-credential-type"
                    value={newCredential.type}
                    onChange={handleChange('type')}
                />
            </FormControl>

            <Button variant="outlined" color="primary" onClick={addNewCredential} >New Credential</Button>

        </>
    )
}

export default CredentialForm