export default function ({ app, redirect }) {    
    if (app.$auth.state.loggedIn && ! app.$auth.state.user.is_verified && app.context.route.name !== 'verify-email') {        
        redirect('/verify-email')
    }
  }