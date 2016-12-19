setTimeout(function() {
  document.querySelector('input[name=fldLoginUserId]').value='captn3m0';

  if (document.querySelector('input[name=fldLoginUserId]') && document.location.href === 'https://netbanking.hdfcbank.com/netbanking/') {
    fLogon();
  }
}, 500);