<template>
    <div class="container">

        <IconEmail class="mx-auto mt-10" />

        <div v-if="isVerifying">
            <div class="p-10 text-center">
                <h4 class="text-base font-bold">Verifying...</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Please wait while we verify your account.</p>
                <span class="loader"></span>
            </div>
        </div>

        <div v-else>
            <div v-if="! hasVerificationToken" class="p-10 text-center">
                <h4 class="text-base font-bold">Registration successful!</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Thank you for creating an account and joining us at VendorMachine. We’ve sent a verification email to the account you registered with, please click the link within the email to verify your address.</p>
                <p class="text-xs text-grey-500 font-bold my-5 mb-10">It could take up to 10 minutes to appear in your inbox, if you can’t find the email check your spam folder or use the resend button.</p>

                <button class="btn btn--primary w-full my-5" @click="resend">
                    <span v-if="!busy">Resend</span>
                    <span v-if="busy" class="loader"></span>
                </button>
            </div>

            <div v-if="hasVerificationToken && hasVerified" class="p-10 text-center">
                <h4 class="text-base font-bold">Email verified!</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Thank you for verifying your email address, you can now sign in to your account.</p>

                <button class="btn btn--primary w-full my-5" @click="redirectWithAuthModal('/')">Continue</button>
            </div>

            <div v-if="hasVerificationToken && ! hasVerified" class="p-10 text-center">
                <h4 class="text-base font-bold">Verification link expired!</h4>

                <p class="text-xs text-grey-500 font-bold my-5">Looks like the link is invalid or has expired. Use the button below to resend.</p>

                <button class="btn btn--primary w-full my-5" @click="resend">
                    <span v-if="!busy">Resend</span>
                    <span v-if="busy" class="loader"></span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import IconEmail from '@/assets/svg/icon-email.svg'

  export default {
    components: {IconEmail},

    asyncData({query}) {
      return {...query}
    },

    data() {
      return {
        busy: false,
        isVerifying: false,
        isVerified: false,
        isResending: false,
        showHomeScreenModal: false,
      }
    },

    created() {
      if (this.email && this.token) {
        this.verify();
      }
    },

    computed: {
      hasVerificationToken() {
        return this.token;
      },

      hasVerified() {
        return this.busy === false && this.isVerified;
      }
    },

    methods: {
      ...mapActions({
        verifyEmail: 'authentication/verifyEmail',
        resendVerifyEmail: 'authentication/resendVerifyEmail',
        redirectWithAuthModal: 'authentication/redirectWithAuthModal'
      }),

      resend() {
        this.busy = true;

        this.resendVerifyEmail({email: this.email})
          .finally(() => {
            this.busy = false;
          })
      },

      verify() {
        this.busy = true;
        this.isVerifying = true;

        this.verifyEmail({email: this.email, token: this.token})
          .then(response => {
            this.isVerified = true;
          })
          .catch(error => {
            this.isVerified = false;
          })
          .finally(() => {
            this.busy = false;
            this.isVerifying = false;
          })
      }
    }
  }
</script>
