$('input').keyup(function() {
    
    var characterCount = $(this).val().length,
    currentTopic = $('#currentTopic'),
    maximumTopic = $('#maximumTopic'),
    countTopic = $('#countTopic');
      
    currentTopic.text(characterCount);
 
});

$('textarea').keyup(function() {
    
    var characterCount = $(this).val().length,
        currentComment = $('#currentComment'),
        maximumComment = $('#maximumComment'),
        countComment = $('#countComment');
        
        currentComment.text(characterCount);
      
});