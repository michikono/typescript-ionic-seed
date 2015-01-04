Feature: Home
  As a user
  I want to visit the home page
  So that I can see the welcome message and log out

  Scenario: Redirect to home
    Given I visit "/"
    Then I should be redirected to the home page

  Scenario: See welcome message
    Given I visit the home page
    Then I should see "Welcome to ionic"
    And see a "Logout" button
    And see an instance of "ion-navicon"

  Scenario: Logout of application
    Given I visit "/app/home"
    And I see a "Logout" control
    And I click on "Logout"
    Given I should be redirected to the login page
