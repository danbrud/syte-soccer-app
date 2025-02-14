import React, { useState } from 'react'
import Header from './components/Header'
import SnackbarAlert from './components/SnackbarAlert'
import TeamsContainer from './components/TeamsContainer'


const App = () => {
  const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' })

  return (
    <div className='App'>
      <Header />
      <TeamsContainer
        openSnackbar={(type => setSnackbar({ ...type, open: true }))}
      />
      <SnackbarAlert
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        hideSnackbar={() => setSnackbar({ open: false, severity: '', message: '' })}
      />
    </div>
  )
}

export default App