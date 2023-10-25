import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function CustomerDropDwon() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      name: '',
      phoneNumber: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    phoneNumber: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      phoneNumber: parseInt(dialogValue.phoneNumber, 10),
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        variant='standard'
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                phoneNumber: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              phoneNumber: '',
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="customer-list-options"
        options={customerList}
        getOptionLabel={(option) => {
          // e.g. value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Bill To" variant='standard' />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any customer in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="name"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.phoneNumber}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  phoneNumber: event.target.value,
                })
              }
              label="phoneNumber"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

// Top 100 customers as rated by IMDb users. http://www.imdb.com/chart/top
const customerList = [
  { name: 'The Shawshank Redemption', phoneNumber: 1994 },
  { name: 'The Godfather', phoneNumber: 1972 },
  { name: 'The Godfather: Part II', phoneNumber: 1974 },
  { name: 'The Dark Knight', phoneNumber: 2008 },
  { name: '12 Angry Men', phoneNumber: 1957 },
  { name: "Schindler's List", phoneNumber: 1993 },
  { name: 'Pulp Fiction', phoneNumber: 1994 },
  {
    name: 'The Lord of the Rings: The Return of the King',
    phoneNumber: 2003,
  },
  { name: 'The Good, the Bad and the Ugly', phoneNumber: 1966 },
  { name: 'Fight Club', phoneNumber: 1999 },
  {
    name: 'The Lord of the Rings: The Fellowship of the Ring',
    phoneNumber: 2001,
  },
  {
    name: 'Star Wars: Episode V - The Empire Strikes Back',
    phoneNumber: 1980,
  },
  { name: 'Forrest Gump', phoneNumber: 1994 },
  { name: 'Inception', phoneNumber: 2010 },
  {
    name: 'The Lord of the Rings: The Two Towers',
    phoneNumber: 2002,
  },
  { name: "One Flew Over the Cuckoo's Nest", phoneNumber: 1975 },
  { name: 'Goodfellas', phoneNumber: 1990 },
  { name: 'The Matrix', phoneNumber: 1999 },
  { name: 'Seven Samurai', phoneNumber: 1954 },
  {
    name: 'Star Wars: Episode IV - A New Hope',
    phoneNumber: 1977,
  },
  { name: 'City of God', phoneNumber: 2002 },
  { name: 'Se7en', phoneNumber: 1995 },
  { name: 'The Silence of the Lambs', phoneNumber: 1991 },
  { name: "It's a Wonderful Life", phoneNumber: 1946 },
  { name: 'Life Is Beautiful', phoneNumber: 1997 },
  { name: 'The Usual Suspects', phoneNumber: 1995 },
  { name: 'Léon: The Professional', phoneNumber: 1994 },
  { name: 'Spirited Away', phoneNumber: 2001 },
  { name: 'Saving Private Ryan', phoneNumber: 1998 },
  { name: 'Once Upon a Time in the West', phoneNumber: 1968 },
  { name: 'American History X', phoneNumber: 1998 },
  { name: 'Interstellar', phoneNumber: 2014 },
  { name: 'Casablanca', phoneNumber: 1942 },
  { name: 'City Lights', phoneNumber: 1931 },
  { name: 'Psycho', phoneNumber: 1960 },
  { name: 'The Green Mile', phoneNumber: 1999 },
  { name: 'The Intouchables', phoneNumber: 2011 },
  { name: 'Modern Times', phoneNumber: 1936 },
  { name: 'Raiders of the Lost Ark', phoneNumber: 1981 },
  { name: 'Rear Window', phoneNumber: 1954 },
  { name: 'The Pianist', phoneNumber: 2002 },
  { name: 'The Departed', phoneNumber: 2006 },
  { name: 'Terminator 2: Judgment Day', phoneNumber: 1991 },
  { name: 'Back to the Future', phoneNumber: 1985 },
  { name: 'Whiplash', phoneNumber: 2014 },
  { name: 'Gladiator', phoneNumber: 2000 },
  { name: 'Memento', phoneNumber: 2000 },
  { name: 'The Prestige', phoneNumber: 2006 },
  { name: 'The Lion King', phoneNumber: 1994 },
  { name: 'Apocalypse Now', phoneNumber: 1979 },
  { name: 'Alien', phoneNumber: 1979 },
  { name: 'Sunset Boulevard', phoneNumber: 1950 },
  {
    name: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    phoneNumber: 1964,
  },
  { name: 'The Great Dictator', phoneNumber: 1940 },
  { name: 'Cinema Paradiso', phoneNumber: 1988 },
  { name: 'The Lives of Others', phoneNumber: 2006 },
  { name: 'Grave of the Fireflies', phoneNumber: 1988 },
  { name: 'Paths of Glory', phoneNumber: 1957 },
  { name: 'Django Unchained', phoneNumber: 2012 },
  { name: 'The Shining', phoneNumber: 1980 },
  { name: 'WALL·E', phoneNumber: 2008 },
  { name: 'American Beauty', phoneNumber: 1999 },
  { name: 'The Dark Knight Rises', phoneNumber: 2012 },
  { name: 'Princess Mononoke', phoneNumber: 1997 },
  { name: 'Aliens', phoneNumber: 1986 },
  { name: 'Oldboy', phoneNumber: 2003 },
  { name: 'Once Upon a Time in America', phoneNumber: 1984 },
  { name: 'Witness for the Prosecution', phoneNumber: 1957 },
  { name: 'Das Boot', phoneNumber: 1981 },
  { name: 'Citizen Kane', phoneNumber: 1941 },
  { name: 'North by Northwest', phoneNumber: 1959 },
  { name: 'Vertigo', phoneNumber: 1958 },
  {
    name: 'Star Wars: Episode VI - Return of the Jedi',
    phoneNumber: 1983,
  },
  { name: 'Reservoir Dogs', phoneNumber: 1992 },
  { name: 'Braveheart', phoneNumber: 1995 },
  { name: 'M', phoneNumber: 1931 },
  { name: 'Requiem for a Dream', phoneNumber: 2000 },
  { name: 'Amélie', phoneNumber: 2001 },
  { name: 'A Clockwork Orange', phoneNumber: 1971 },
  { name: 'Like Stars on Earth', phoneNumber: 2007 },
  { name: 'Taxi Driver', phoneNumber: 1976 },
  { name: 'Lawrence of Arabia', phoneNumber: 1962 },
  { name: 'Double Indemnity', phoneNumber: 1944 },
  {
    name: 'Eternal Sunshine of the Spotless Mind',
    phoneNumber: 2004,
  },
  { name: 'Amadeus', phoneNumber: 1984 },
  { name: 'To Kill a Mockingbird', phoneNumber: 1962 },
  { name: 'Toy Story 3', phoneNumber: 2010 },
  { name: 'Logan', phoneNumber: 2017 },
  { name: 'Full Metal Jacket', phoneNumber: 1987 },
  { name: 'Dangal', phoneNumber: 2016 },
  { name: 'The Sting', phoneNumber: 1973 },
  { name: '2001: A Space Odyssey', phoneNumber: 1968 },
  { name: "Singin' in the Rain", phoneNumber: 1952 },
  { name: 'Toy Story', phoneNumber: 1995 },
  { name: 'Bicycle Thieves', phoneNumber: 1948 },
  { name: 'The Kid', phoneNumber: 1921 },
  { name: 'Inglourious Basterds', phoneNumber: 2009 },
  { name: 'Snatch', phoneNumber: 2000 },
  { name: '3 Idiots', phoneNumber: 2009 },
  { name: 'Monty Python and the Holy Grail', phoneNumber: 1975 },
];