Feature: Fake Login Scenario

    @AddScenario
    Scenario: Fake login system and verification
        Given I input my credentials
        When I click the login button
        Then I confirm I have logged in successfully
