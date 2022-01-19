'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var assert = require('chai').assert;

var PaymentTransactionsModule = require('./PaymentTransactions');
var RecurringBillingModule = require('./RecurringBilling');
var TransactionReportingModule = require('./TransactionReporting');
var VisaCheckoutModule = require('./VisaCheckout');
var PayPalExpressCheckoutModule = require('./PayPalExpressCheckout');
//var ApplePayTransactionsModule = require('./ApplePayTransactions');
var CustomerProfilesModule = require('./CustomerProfiles');
var filterTestMethod = process.argv[2]
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('./utils.js');
var constants = require('./constants.js');
class TestRunner {
	validateResponse(response){
		if(response == null){
			return false;
		}

		if(response.getMessages().getResultCode() != ApiContracts.MessageTypeEnum.OK){
			return false;
		}

		return true;
	}

/*	authorizeCreditCard(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(validateFunctionCallback);
	}

	chargeCreditCard(validateFunctionCallback){
		PaymentTransactionsModule.chargeCreditCard(validateFunctionCallback);
	}

	capturePreviouslyAuthorizedAmount(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			PaymentTransactionsModule.capturePreviouslyAuthorizedAmount(response.getTransactionResponse().getTransId(), 
					validateFunctionCallback);
		});
	}

	captureFundsAuthorizedThroughAnotherChannel(validateFunctionCallback){
		PaymentTransactionsModule.captureFundsAuthorizedThroughAnotherChannel(validateFunctionCallback);
	}

	refundTransaction(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			PaymentTransactionsModule.capturePreviouslyAuthorizedAmount(response.getTransactionResponse().getTransId(),
				function(captureResponse){
					PaymentTransactionsModule.refundTransaction(captureResponse.getTransactionResponse().getTransId(), validateFunctionCallback);
				});
		});
	}

	voidTransaction(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			PaymentTransactionsModule.voidTransaction(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	updateSplitTenderGroup(validateFunctionCallback){
		PaymentTransactionsModule.updateSplitTenderGroup(validateFunctionCallback);
	}

	debitBankAccount(validateFunctionCallback){
		PaymentTransactionsModule.debitBankAccount(validateFunctionCallback);
	}

	creditBankAccount(validateFunctionCallback){
		PaymentTransactionsModule.debitBankAccount(function(response){
			PaymentTransactionsModule.creditBankAccount(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	chargeCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				PaymentTransactionsModule.chargeCustomerProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	chargeTokenizedCreditCard(validateFunctionCallback){
		PaymentTransactionsModule.chargeTokenizedCreditCard(validateFunctionCallback);
	}

	cancelSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.cancelSubscription(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	createSubscriptionFromCustomerProfile(validateFunctionCallback){
		/* CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
					RecurringBillingModule.createSubscriptionFromCustomerProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
				});
			});
		}); */
		
	/*	CustomerProfilesModule.getCustomerProfile("1929176981", function(profileResponse) {
			RecurringBillingModule.createSubscriptionFromCustomerProfile(profileResponse.profile.customerProfileId, profileResponse.profile.paymentProfiles[0].customerPaymentProfileId, profileResponse.profile.shipToList[0].customerAddressId, validateFunctionCallback);
		});
		
	}

	createSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(validateFunctionCallback);
	}

	getListOfSubscriptions(validateFunctionCallback){
		RecurringBillingModule.getListOfSubscriptions(validateFunctionCallback);
	}

	getSubscriptionStatus(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.getSubscriptionStatus(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	getSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.getSubscription(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	updateSubscription(validateFunctionCallback){
		RecurringBillingModule.createSubscription(function(response){
			RecurringBillingModule.updateSubscription(response.getSubscriptionId(), validateFunctionCallback);
		});
	}

	getBatchStatistics(validateFunctionCallback){
		TransactionReportingModule.getBatchStatistics('4594221', validateFunctionCallback);
	}

	getSettledBatchList(validateFunctionCallback){
		TransactionReportingModule.getSettledBatchList(validateFunctionCallback);
	}

	getTransactionDetails(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			TransactionReportingModule.getTransactionDetails(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getTransactionList(validateFunctionCallback){
		TransactionReportingModule.getTransactionList('4594221', validateFunctionCallback);
	}
	
	getTransactionListForCustomer(validateFunctionCallback){
		TransactionReportingModule.getTransactionListForCustomer('1811474252', validateFunctionCallback);
		
	}

	getUnsettledTransactionList(validateFunctionCallback){
		TransactionReportingModule.getUnsettledTransactionList(validateFunctionCallback);
	}

	createVisaSrcTransaction(validateFunctionCallback){
		VisaCheckoutModule.createVisaSrcTransaction(validateFunctionCallback);
	}

	decryptVisaSrcData(validateFunctionCallback){
		VisaCheckoutModule.decryptVisaSrcData(validateFunctionCallback);
	}

	authorizationOnly(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationOnly(validateFunctionCallback);
	}

	authorizationAndCapture(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationAndCapture(validateFunctionCallback);
	}

	authorizationOnlyContinued(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationOnly(function(response){
			PayPalExpressCheckoutModule.authorizationOnlyContinued(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	authorizationAndCaptureContinued(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationAndCapture(function(response){
			PayPalExpressCheckoutModule.authorizationAndCaptureContinued(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	priorAuthorizationCapture(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationAndCapture(function(response){
			PayPalExpressCheckoutModule.priorAuthorizationCapture(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	paypalVoid(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationAndCapture(function(response){
			PayPalExpressCheckoutModule.paypalVoid(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getDetails(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationAndCapture(function(response){
			PayPalExpressCheckoutModule.getDetails(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	credit(validateFunctionCallback){
		PayPalExpressCheckoutModule.authorizationAndCapture(function(response){
			PayPalExpressCheckoutModule.credit(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	createApplePayTransaction(validateFunctionCallback){
		ApplePayTransactionsModule.createApplePayTransaction(validateFunctionCallback);
	}*/

	async createCustomerProfile(validateFunctionCallback){

		var user = {
		  "createCustomerProfileRequest": {
		    "merchantAuthentication": {
		      "name": "5KP3u95bQpv",
		      "transactionKey": "346HZ32z3fP4hTG2"
		    },
		    "clientId": null,
		    "profile": {
		      "merchantCustomerId": "M_cust32681",
		      "description": "Profile description here",
		      "email": "cust13389@anet.net",
		      "paymentProfiles": [
		        {
		          "customerType": "individual",
		          "billTo": {
		            "firstName": "test",
		            "lastName": "scenario",
		            "address": "123 Main Street",
		            "city": "Bellevue",
		            "state": "WA",
		            "zip": "98004",
		            "country": "USA",
		            "phoneNumber": "000-000-0000"
		          },
		          "payment": {
		            "creditCard": {
		              "cardNumber": "4242424242424242",
		              "expirationDate": "0822"
		            }
		          }
		        }
		      ]
		    },
		    "validationMode": "testMode"
		  }
		}

	    //const user = req.body;
	    console.log(" user parameter", user);

	    var ctrl = new ApiControllers.CreateCustomerProfileController(
	      user
	    );

	    ctrl.execute(async function () {
	      var apiResponse = await ctrl.getResponse();
	      console.log("apiResponse", apiResponse);

	      var response = new ApiContracts.CreateCustomerProfileResponse(apiResponse);
	      console.log("response", response);

	      //pretty print response
	      //console.log(JSON.stringify(response, null, 2));

	      if (response != null) {
	        if (
	          response.getMessages().getResultCode() ==
	          ApiContracts.MessageTypeEnum.OK
	        ) {
	          console.log(
	            "Successfully created a customer profile with id: " +
	              response.getCustomerProfileId()
	          );
	            const { isTrial } = user;

	            const user = await new User(user).save();

	            const token = generateTokenResponse(user, user.token());


	            res.status(httpStatus.CREATED);
	            return res.json({ token, user });
	        } else {
	          console.log("Result Code: " + response.getMessages().getResultCode());
	          console.log(
	            "Error Code: " + response.getMessages().getMessage()[0].getCode()
	          );
	          console.log(
	            "Error message: " + response.getMessages().getMessage()[0].getText()
	          );
	          return {
	            error:
	              "Error message: " +
	              response.getMessages().getMessage()[0].getText(),
	          };
	        }
	      } else {
	        console.log("Null response received");
	        return { error: "Null response received" };
	      }
	    });
		return;
	}

/*	createCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	createCustomerProfileFromTransaction(validateFunctionCallback){
		PaymentTransactionsModule.authorizeCreditCard(function(response){
			CustomerProfilesModule.createCustomerProfileFromTransaction(response.getTransactionResponse().getTransId(), validateFunctionCallback);
		});
	}

	getCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.getCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	getCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.getCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	getCustomerPaymentProfileList(validateFunctionCallback){
		CustomerProfilesModule.getCustomerPaymentProfileList(validateFunctionCallback);
	}
	
	createCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	deleteCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.deleteCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	deleteCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.deleteCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	deleteCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.deleteCustomerShippingAddress(response.getCustomerProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});
	}

	getCustomerProfileIds(validateFunctionCallback){
		CustomerProfilesModule.getCustomerProfileIds(validateFunctionCallback);
	}

	getCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.getCustomerShippingAddress(response.getCustomerProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});
	}

	getHostedProfilePage(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.getHostedProfilePage(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	updateCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.updateCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}

	updateCustomerProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.updateCustomerProfile(response.getCustomerProfileId(), validateFunctionCallback);
		});
	}

	updateCustomerShippingAddress(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerShippingAddress(response.getCustomerProfileId(), function(shippingResponse){
				CustomerProfilesModule.updateCustomerShippingAddress(response.getCustomerProfileId(), shippingResponse.getCustomerAddressId(), validateFunctionCallback);
			});
		});
	}*/

/*	validateCustomerPaymentProfile(validateFunctionCallback){
		CustomerProfilesModule.createCustomerProfile(function(response){
			CustomerProfilesModule.createCustomerPaymentProfile(response.getCustomerProfileId(), function(paymentProfileResponse){
				CustomerProfilesModule.validateCustomerPaymentProfile(response.getCustomerProfileId(), paymentProfileResponse.getCustomerPaymentProfileId(), validateFunctionCallback);
			});
		});
	}*/

	callTestMethod(testMethodName, validateFunctionCallback){
		return this[testMethodName](validateFunctionCallback);
	}
	testAllSamples(){
		var lineReader = require('readline').createInterface({
			input: require('fs').createReadStream('./list_of_sample_codes.txt')
		});

		var testRunnerObject = this;

		lineReader.on('line', function (line) {
			var sample = line.split(',');
			var apiName = sample[0];
			var shouldApiRun = sample[1].trim()[0];

			if(shouldApiRun == '1'){
				if (filterTestMethod && apiName !== filterTestMethod) return
				console.log('\n************************ Running : ' + apiName + ' ************************\n');
				testRunnerObject.callTestMethod(apiName, function(response) {
					console.log('\n************************ Testing : ' + apiName + ' ************************\n');
					assert.isTrue(testRunnerObject.validateResponse(response));
					/*
					if(!testRunnerObject.validateResponse(response)){
						console.log('Error in running ' + apiName + '. Stopped test runner.');
						return;
					}
					*/
				});
				
				console.log('\n************************ Ending : ' + apiName + ' ************************\n');
			}
		});
	}
}

var testRunner  = new TestRunner();
testRunner.testAllSamples();
