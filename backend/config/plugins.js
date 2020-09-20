module.exports = ({ env }) => ({
    upload: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUD_NAME'),
        api_key: env('CLOUD_KEY'),
        api_secret: env('CLOUD_SECRET'),
      }
    }
})