Feature: Login
  As a user
  I want to visit the login page
  So that I can access the application

  Scenario: See login page
    Given I visit the login page
    Then I should see heading "Login"
    And see a "Login" button
    And not see an instance of "ion-navicon.activated"

  Scenario: Fill in login form
    Given I visit the login page
    And fill in "username" with "Julie"
    And fill in "password" with "myPassword"
    Then "username" should be "defaultJulie"
    And "password" should be "myPassword"

  Scenario: Submit the login form
    Given I visit the login page
    And press "Login"
    Then I should be redirected to the home page
