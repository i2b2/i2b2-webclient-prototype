/**
 * @projectDescription	Messages to configure and build a WORK cell communicator object.
 * @namespace	i2b2.WORK.ajax
 * @author		Nick Benik, Griffin Weber MD PhD
 * @version 	1.3
 * updated 2-20-09: Refactor Communicator layer [Nick Benik] 
 */

// create the communicator Object
i2b2.AI.ajax = i2b2.hive.communicatorFactory("AI");

// create namespaces to hold all the communicator messages and parsing routines
i2b2.AI.cfg.msgs = {};
i2b2.AI.cfg.parsers = {};

// ================================================================================================== //
//i2b2.AI.cfg.msgs.getFoldersByProject = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+ "NO EXAMPLE OF THIS FUNCTION BEING CALLED WAS FOUND."


// ================================================================================================== //
i2b2.AI.cfg.msgs.getQuestion = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+
'<ns3:request xmlns:ns3="http://www.i2b2.org/xsd/hive/msg/1.1/" '+
'	xmlns:ns4="http://www.i2b2.org/xsd/cell/ai/1.1/" '+
'	xmlns:ns2="http://www.i2b2.org/xsd/hive/plugin/" '+
'	xmlns:ns5="http://www.i2b2.org/xsd/cell/ont/1.1/">\n'+
'	<message_header>\n'+
'		{{{proxy_info}}}\n'+
'		<i2b2_version_compatible>1.1</i2b2_version_compatible>\n'+
'			<sending_application>\n'+
'			<application_name>i2b2 AI</application_name>\n'+
'			<application_version>' + i2b2.ClientVersion + '</application_version>\n'+
'		</sending_application>\n'+
'		<sending_facility>\n'+
'			<facility_name>i2b2 Hive</facility_name>\n'+
'		</sending_facility>\n'+
'		<receiving_application>\n'+
'			<application_name>1.1</application_name>\n'+
'			<application_version>' + i2b2.ClientVersion + '</application_version>\n'+
'		</receiving_application>\n'+
'		<receiving_facility>\n'+
'			<facility_name>i2b2 Hive</facility_name>\n'+
'		</receiving_facility>\n'+
'		<datetime_of_message>{{{header_msg_datetime}}}</datetime_of_message>\n'+
'		<security>\n'+
'			<domain>{{{sec_domain}}}</domain>\n'+
'			<username>{{{sec_user}}}</username>\n'+
'			{{{sec_pass_node}}}\n'+'	</security>\n'+
'		<message_control_id>\n'+
'			<message_num>{{{header_msg_id}}}</message_num>\n'+
'			<instance_num>0</instance_num>\n'+
'		</message_control_id>\n'+
'		<processing_id>\n'+
'			<processing_id>P</processing_id>\n'+
'			<processing_mode>I</processing_mode>\n'+
'		</processing_id>\n'+
'		<accept_acknowledgement_type>AL</accept_acknowledgement_type>\n'+
'		<application_acknowledgement_type>AL</application_acknowledgement_type>\n'+
'		<country_code>US</country_code>\n'+
'		<project_id>{{{sec_project}}}</project_id>\n'+
'	</message_header>\n'+
'	<request_header>\n'+
'		<result_waittime_ms>{{{result_wait_time}}}000</result_waittime_ms>\n'+
'	</request_header>\n'+
'	<message_body>\n'+
'		<ns4:get_question>\n'+
'			<question>{{{question}}}</question>\n'+
'		</ns4:get_question>\n'+
'	</message_body>\n'+
'</ns3:request>';
i2b2.AI.ajax._addFunctionCall("getQuestion","{{{URL}}}getQuestion", i2b2.AI.cfg.msgs.getQuestion);

