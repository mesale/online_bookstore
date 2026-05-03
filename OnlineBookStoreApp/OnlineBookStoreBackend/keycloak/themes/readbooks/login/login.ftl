<#import "template.ftl" as layout>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login — readbooks</title>
  <link rel="stylesheet" href="${url.resourcesPath}/css/login.css">
</head>
<body>

<div class="rb-wrapper">

  <!-- Left decorative panel -->
  <div class="rb-left">
    <div class="rb-logo">read<span>books</span></div>
    <p class="rb-tagline">Your marketplace for buying and selling books across Ethiopia</p>
    <div class="rb-books-decoration">
      <div class="rb-book"></div>
      <div class="rb-book"></div>
      <div class="rb-book"></div>
      <div class="rb-book"></div>
    </div>
  </div>

  <!-- Right login form -->
  <div class="rb-right">
    <h1 class="rb-form-title">Welcome back</h1>
    <p class="rb-form-subtitle">Sign in to your readbooks account</p>

    <!-- Error message -->
    <#if message?has_content && message.type = "error">
      <div class="rb-alert-error">
        ⚠ ${message.summary}
      </div>
    </#if>

    <form action="${url.loginAction}" method="post">
      <input type="hidden" name="credentialId" value="${(auth.selectedCredential)!''}">

      <!-- Email / Username -->
      <div class="rb-field">
        <label class="rb-label" for="username">
          ${msg("usernameOrEmail")}
        </label>
        <input
          class="rb-input"
          id="username"
          name="username"
          type="text"
          autofocus
          autocomplete="username"
          value="${(login.username)!''}"
          placeholder="Enter your email or username"
        />
      </div>

      <!-- Password -->
      <div class="rb-field">
        <label class="rb-label" for="password">
          ${msg("password")}
        </label>
        <input
          class="rb-input"
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          placeholder="Enter your password"
        />
      </div>

      <!-- Forgot password -->
      <#if realm.resetPasswordAllowed>
        <div class="rb-forgot">
          <a href="${url.loginResetCredentialsUrl}">Forgot password?</a>
        </div>
      </#if>

      <!-- Submit -->
      <button class="rb-btn" type="submit">
        Sign In
      </button>

    </form>

    <!-- Register link -->
    <#if realm.registrationAllowed>
      <div class="rb-register-link">
        Don't have an account?
        <a href="${url.registrationUrl}">Create one</a>
      </div>
    </#if>

  </div>
</div>

</body>
</html>
