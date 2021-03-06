$(document).ready(function()
{
	//Show tooltips
	$('[data-toggle="tooltip"]').tooltip();

	$('.delete_project').click(function()
	{
		var port = $(this).attr('id');
		var domain = $(this).attr('domain');
		if (confirm('Are you sure you want to delete this domain ' + domain + '?'))
		{
			$.ajax(
			{
				url: '/end_project.php',
				type: "POST",
				data:
				{
					port:port
				},
				success: function (data) {
					if (data.match("^tab 1 of window id"))
					{
						alert('Please go to your terminal to complete the rest of process');
					}
					else
					{
						alert('Not able to open new terminal. Please try again or try run the command in terminal manually');
					}

				}
			});
		}
	});

	$('#create_project').click(function()
	{
		var domain = $('#domain').val();
		var repository = $('#repository').val();
		var branch = $('#branch_input').val();
		var ticket_number = $('#ticket_number').val();
		var database = $('#database').val();
		var host = $('#host').val();
		var commit_message = $('#commit_message').val();

		if (confirm('Are you sure you want to delete this?'))
		{
			$.ajax(
			{
				url: '/new_project.php',
				type: "POST",
				data:
				{
					domain:domain,
					repository:repository,
					domain:domain,
					branch:branch,
					ticket_number:ticket_number,
					database:database,
					host:host,
					commit_message:commit_message
				},
				success: function (data)
				{
					if (data.match("^tab 1 of window id"))
					{
						alert('Please go to your terminal to complete the rest of process');
					}
					else
					{
						alert('Not able to open new terminal. Please try again or try run the command in terminal manually');
					}
				}
			});
		}
	});

	$("#go").click(function()
	{
		var ticket=$("#ticket").val();

		//Check if the ticket number starts with #. (if it does, substring  and slice would be same)
		if(ticket.slice(0,1) == '#')
		{
			ticket = ticket.slice(1);
		}

		//If entered value is int, assume it to be a ticket number
		if(Math.floor(ticket) == ticket && $.isNumeric(ticket))
		{
			var url = "http://trac.worldstores.co.uk/ticket/" + ticket;
		}
		// Else assume, searching track
		else
		{
			var url = "http://trac.worldstores.co.uk/search?q=" + ticket;
		}

		var win = window.open(url, '_blank');
		win.focus();
	});


	$(".repository_dropdown").click(function()
	{
		var panel = $(this).attr("controls_panel");
		$("#"+panel).fadeToggle();
	});

	$("#ticket").keypress(function(event)
	{
	    if(event.keyCode == 13)
	    {
	        event.preventDefault();
	        $("#go").click();
	    }
	});

	if (window.addEventListener)
	{
		window.addEventListener("keydown", function(e)
		{
			//key 68 = 'D' - Select ticket input field
			if (e.keyCode == "68" && e.ctrlKey == true)
			{
				$("#ticket").select();
			}
			//key 78 = 'N' - Create new ticket
			if (e.keyCode == "78" && e.ctrlKey == true)
			{
				var url = "http://trac.worldstores.co.uk/newticket";
				var win = window.open(url, '_blank');
       			win.focus();
			}
		}, true);
	}
});