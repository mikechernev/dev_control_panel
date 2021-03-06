<?php
require_once 'includes/common.php';

$repo = $_POST['repo'];

$xml_file = $_SERVER["DOCUMENT_ROOT"] . "../feeds/branch_list_" . $repo . ".xml";

if(file_exists($xml_file))
{
	if (filesize($xml_file) > 0)
	{
		$branches = simplexml_load_file($xml_file);
	}
	else
	{
		unlink($xml_file);
		echo "file_not_found";
		exit();
	}

	echo '<select class="branch_input" name="branch_input" id="branch_input" placeholder="Branch" title="Branch Name: Creating new branch, enter the name you would like without date at start and ticket number at end. OR the exact name of branch you want to checkout">';
	echo '<option value="">Branch...</option>';

	foreach($branches->list->entry as $branch)
	{

		$revision = $branch->commit->attributes()->revision;
		$style = '';

		if ($svn_user == $branch->commit->author)
		{
			$style = 'style="font-weight: bold;"';
		}
		echo '<option value="' . $branch->name . '" ' . $style . '><b>' . $branch->name . '<b> ---- [' . $branch->commit->author . ' - ' . $revision . ' - ' . $branch->commit->date . ']</option>';
	}
	echo '<select>';
}
else
{
	echo "file_not_found";
}